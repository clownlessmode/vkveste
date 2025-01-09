const LogoFull = ({ className }: { className?: string }) => {
  return (
    <svg
      width="430"
      className={className}
      height="68"
      viewBox="0 0 430 68"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g mask="url(#mask0_497_72)">
        <path
          d="M102.5 1.08763e-05H62.3225L39.1214 23.9497V0L0.5 33.0733L39.1214 68V46.0461L58.7857 68H102.359L68.5471 33.0733L102.5 1.08763e-05Z"
          fill="#F8BC0F"
        />
        <path
          d="M218.547 17H200.98L190.271 30.05H185.086V17H168.188V51.8H185.086V39.2519H189.77L199.307 51.8H218.38L203.489 33.8981L218.547 17Z"
          fill="white"
        />
        <path
          d="M285.135 42.9334V38.4161H306.383V30.0507H285.135V26.0353H310.231V17.168H268.404V51.8007H310.231V42.9334H285.135Z"
          fill="white"
        />
        <path
          d="M328.299 42.9327V26.0346H338.672V17H311.568V51.8H353.395V42.9327H328.299Z"
          fill="white"
        />
        <path
          d="M340.012 17V26.0346H354.736V51.8H371.466V26.0346H386.189V17H340.012Z"
          fill="white"
        />
        <path
          d="M404.089 42.9334V38.4161H425.337V30.0507H404.089V26.0353H429.185V17.168H387.359V51.8007H429.185V42.9334H404.089Z"
          fill="white"
        />
        <path
          d="M153.296 33.5635L166.848 17H146.102C145.767 17 145.433 17 145.098 17H119.5V51.8H166.848V33.5635H153.296ZM136.063 25.1981H147.44V30.3846H136.063V25.1981ZM149.783 43.6019H136.063V38.0808H149.615V43.6019H149.783Z"
          fill="white"
        />
        <path
          d="M253.681 33.5635L267.233 17H246.487C246.152 17 245.817 17 245.483 17H219.885V51.8H267.233V33.5635H253.681ZM236.615 25.1981H247.992V30.3846H236.615V25.1981ZM250.167 43.6019H236.615V38.0808H250.167V43.6019Z"
          fill="white"
        />
      </g>
    </svg>
  )
}

const LogoText = ({ className }: { className?: string }) => {
  return (
    <svg
      className={className}
      viewBox="0 0 509 50"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clipPath="url(#clip0_35_15)">
        <path
          d="M162.004 0.474121H133.27L115.756 19.0455H107.273V0.474121H79.6338V49.998H107.273V32.1409H114.935L130.534 49.998H161.731L137.375 24.5219L162.004 0.474121Z"
          fill="currentColor"
        />
        <path
          d="M270.919 37.3829V30.9543H305.674V19.0496H270.919V13.3354H311.968V0.716309H243.554V50.002H311.968V37.3829H270.919Z"
          fill="currentColor"
        />
        <path
          d="M341.522 37.379V13.3313H358.488V0.474121H314.156V49.998H382.57V37.379H341.522Z"
          fill="currentColor"
        />
        <path
          d="M360.678 0.474121V13.3313H384.759V49.998H412.125V13.3313H436.207V0.474121H360.678Z"
          fill="currentColor"
        />
        <path
          d="M465.489 37.3829V30.9543H500.243V19.0496H465.489V13.3354H506.537V0.716309H438.123V50.002H506.537V37.3829H465.489Z"
          fill="currentColor"
        />
        <path
          d="M55.2785 24.0457L77.4446 0.474121H43.5113C42.964 0.474121 42.4167 0.474121 41.8694 0.474121H0V49.998H77.4446V24.0457H55.2785ZM27.0919 12.1408H45.7005V19.5217H27.0919V12.1408ZM49.5317 38.3314H27.0919V30.4742H49.2581V38.3314H49.5317Z"
          fill="currentColor"
        />
        <path
          d="M219.472 24.0457L241.638 0.474121H207.705C207.157 0.474121 206.61 0.474121 206.063 0.474121H164.193V49.998H241.638V24.0457H219.472ZM191.559 12.1408H210.168V19.5217H191.559V12.1408ZM213.725 38.3314H191.559V30.4742H213.725V38.3314Z"
          fill="currentColor"
        />
      </g>
      <defs>
        <clipPath id="clip0_35_15">
          <rect width="509" height="50" fill="currentColor" />
        </clipPath>
      </defs>
    </svg>
  )
}

const LogoIcon = ({ className }: { className?: string }) => {
  return (
    <svg
      width="40"
      height="64"
      className={className}
      viewBox="0 0 40 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M0 12.303L15.1344 0.0424805V45.6892L24.1958 36.258H40L26.6667 49.273L40 63.0425H22.8438L15.1344 54.3658V63.0425L0 49.273V12.303Z"
        fill="currentColor"
      />
    </svg>
  )
}

export { LogoFull, LogoText, LogoIcon }
