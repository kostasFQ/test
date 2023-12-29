import { Link } from "react-router-dom";

type AuthRedirectProps = {
  goToHref: string
  goToTitle: string
  label: string
}

function AuthRedirect({ goToHref, goToTitle, label }: AuthRedirectProps) {
  return (
    <>
      <sub>{label}</sub>
      <sub>
        <Link to={goToHref}>{goToTitle}</Link>
      </sub>
    </>
  )
};

export default AuthRedirect;
