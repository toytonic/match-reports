import { Box, Container, Link } from "@mui/material";
import { PropsWithChildren } from "react";

function Footer() {
  return (
    <Box sx={{ py: 1 }} component="footer">
      <Container sx={{ display: "flex", alignItems: "center" }}>
        <FooterLink>Terms & Conditions</FooterLink> |{" "}
        <FooterLink> Privacy policy</FooterLink>
      </Container>
    </Box>
  );
}

function FooterLink({ children }: PropsWithChildren) {
  return <Link sx={{ px: 1, fontWeight: "bold" }}>{children}</Link>;
}

export default Footer;
