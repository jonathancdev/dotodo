import Link from "next/link";
import { Button } from "@chakra-ui/react";

function ChakraNextLinkButton({ href, children, ...props }) {
  return (
    <Link href={href} passHref>
      <Button variant="link" color="white" m={2} as="a" {...props}>
        {children}
      </Button>
    </Link>
  );
}
export default ChakraNextLinkButton;
