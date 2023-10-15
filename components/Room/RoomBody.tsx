export function RoomBody({
  children,
  ...rest
}: React.HTMLAttributes<HTMLDivElement> & { children: React.ReactNode }) {
  return <div {...rest}>{children}</div>;
}
