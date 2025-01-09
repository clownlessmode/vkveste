import { z } from "zod"
import { router } from "../__internals/router"
import { publicProcedure } from "../procedures"
import { db } from "@/db"
import { Resend } from "resend"
import { EmailTemplate } from "@/components/emails/test-template"

const resend = new Resend(process.env.RESEND_API_KEY)

export const BookingRouter = router({
  checkAvailability: publicProcedure
    .input(
      z.object({
        date: z.string(),
        slot: z.string(),
        time: z.string(),
      })
    )
    .query(async ({ input, c }) => {
      try {
        const booking = await db.booking.findFirst({
          where: {
            date: input.date,
            slot: input.slot,
            time: input.time,
            status: {
              in: ["confirmed", "pending"],
            },
          },
        })

        return c.json({
          success: true,
          isAvailable: !booking,
          existingBooking: booking,
        })
      } catch (error) {
        console.error("Error checking availability:", error)
        return c.json({
          success: false,
          isAvailable: false,
          error: "Failed to check availability",
        })
      }
    }),

  create: publicProcedure
    .input(
      z.object({
        questName: z.string(),
        date: z.string(),
        time: z.string(),
        slot: z.string(),
        price: z.string(),
      })
    )
    .mutation(async ({ input, c }) => {
      // Add 'c' here
      const existingBooking = await db.booking.findFirst({
        where: {
          date: input.date,
          slot: input.slot,
          time: input.time,
          status: {
            in: ["confirmed", "pending"],
          },
        },
      })

      if (existingBooking) {
        const updatedBooking = await db.booking.update({
          where: { id: existingBooking.id },
          data: {
            ...input,
            status: "confirmed",
          },
        })

        return c.json({
          // Use c.json instead of direct return
          success: true,
          booking: updatedBooking,
        })
      }

      const newBooking = await db.booking.create({
        data: {
          ...input,
          status: "confirmed",
        },
      })

      return c.json({
        // Use c.json instead of direct return
        success: true,
        booking: newBooking,
      })
    }),

  // New Procedure to Fetch All Bookings from Today Onwards
  getBookings: publicProcedure
    .input(
      z.object({
        startDate: z.string().optional(),
      })
    )
    .query(async ({ input, c }) => {
      try {
        const today = new Date()
        today.setHours(0, 0, 0, 0)

        const bookings = await db.booking.findMany({
          where: {
            date: {
              gte: input.startDate || today.toISOString().split("T")[0],
            },
            status: {
              in: ["confirmed", "pending"],
            },
          },
        })

        return c.json({
          success: true,
          bookings,
        })
      } catch (error) {
        console.error("Error fetching bookings:", error)
        return c.json({
          success: false,
          bookings: [],
          error: "Failed to fetch bookings",
        })
      }
    }),

  sendBookingConfirmation: publicProcedure
    .input(
      z.object({
        questName: z.string(),
        date: z.string(),
        time: z.string(),
        slot: z.string(),
      })
    )
    .mutation(async ({ input, c }) => {
      try {
        const { data, error } = await resend.emails.send({
          from: "Your Quest <onboarding@resend.dev>",
          to: "araorterievs@gmail.com",
          subject: `Booking Confirmation - ${input.questName}`,
          react: EmailTemplate({
            firstName: input.questName,
            bookingDetails: {
              date: input.date,
              time: input.time,
              slot: input.slot,
            },
          }),
        })

        if (error) {
          console.error("Email sending error:", error)
          return c.json({
            success: false,
            error: "Failed to send confirmation email",
          })
        }

        return c.json({
          success: true,
          emailData: data,
        })
      } catch (error) {
        console.error("Email sending error:", error)
        return c.json({
          success: false,
          error: "Failed to send confirmation email",
        })
      }
    }),
})
