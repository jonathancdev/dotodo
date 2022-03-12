import Link from "next/link";
import { Button } from "@chakra-ui/react";

function ChakraNextLinkButton({ href, ...props }) {
  const { text, variant } = props;
  return (
    <Link href={href} passHref>
      <Button variant={variant} size="md" m="1" as="a" {...props}>
        {text}
      </Button>
    </Link>
  );
}
export default ChakraNextLinkButton;
