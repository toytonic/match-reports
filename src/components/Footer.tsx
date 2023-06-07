import { Box, Container, Link, Stack } from "@mui/material";
import { PropsWithChildren } from "react";

function Footer() {
  return (
    <Box sx={{ py: 1 }} component="footer">
      <Container
        sx={{ display: "flex", alignItems: "center" }}
        maxWidth={false}
      >
        <Stack spacing={1} direction="row" sx={{ ml: "60px" }}>
          <FooterLink>Terms & Conditions</FooterLink>
          <span>|</span>
          <FooterLink> Privacy policy</FooterLink>
        </Stack>
      </Container>
    </Box>
  );
}

function FooterLink({ children }: PropsWithChildren) {
  return <Link sx={{ fontWeight: "bold" }}>{children}</Link>;
}

export default Footer;
