import Link from "next/link";
import { UserNav } from "./UserNav";

const Navbar: React.FunctionComponent<React.HTMLAttributes<HTMLElement>> = ({
  ...rest
}) => {
  const { className } = rest;
  const cn = className ? className : "";

  return (
    <nav
      {...rest}
      className={`flex px-10 py-2 border-b-2 border-b-secondary/80 justify-between ${cn}`}
    >
      <Link href="/">
        <h3 className="block font-sans text-3xl font-semibold leading-snug tracking-normal text-inherit antialiased">
          VChatter
        </h3>
      </Link>
      <div className="flex flex-col justify-center">
        <UserNav />
      </div>
    </nav>
  );
};

export { Navbar };
