import { Link } from "react-router-dom";

const AuthLayout = ({
  children,
  formHeading,
  formSubHeading,
  handleSubmit,
  to,
  footerText,
  footerLink,
}) => {
  return (
    <div className="min-h-screen w-full flex flex-col justify-center items-center">
      <div className="bg-card p-8 rounded-xl shadow-xl md:w-[450px]">
        <div className="flex flex-col items-center justify-center gap-2 mb-3">
          <p className="sm:text-3xl font-semibold text-card-foreground">
            {formHeading}
          </p>
          <p className="text-muted-foreground">{formSubHeading}</p>
        </div>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {children}
        </form>
        {footerText && (
          <div className="mt-4 text-center">
            <Link to={to} className="text-[14px]">
              {footerText}
              <span className=" ml-2 text-primary font-medium cursor-pointer">
                {footerLink}
              </span>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default AuthLayout;
