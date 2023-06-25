import { Button, Link } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";

type Props = {};

export const Layout = (props: Props) => {
  return (
    <div>
      <Outlet />
      <Button
        as={Link}
        position="absolute"
        top="1rem"
        right="1rem"
        target="_blank"
        href={"http://localhost:5555"}
      >
        Prisma Studio
      </Button>
    </div>
  );
};
