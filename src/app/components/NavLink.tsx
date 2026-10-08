import Link from "next/link";
import { ReactNode } from "react";

type NavLinkProps = {
  href: string;
  children: ReactNode;
};

export default function NavLink({ href, children }: NavLinkProps) {
  return (
    <Link className="hover:text-amber-100" href={href}>
      {children}
    </Link>
  );
}
