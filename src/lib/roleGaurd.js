export function hasRole(
  session,
  role
) {
  return (
    session?.user?.role === role
  );
}