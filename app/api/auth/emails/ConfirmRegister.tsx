import {
  Html,
  Head,
  Body,
  Container,
  Section,
  Heading,
  Text,
  Button,
  Hr,
} from "@react-email/components";

export default function ConfirmRegisterEmail({
  verificationUrl,
}: {
  verificationUrl: string;
}): JSX.Element {
  return (
    <Html>
      <Head />
      <Body style={{ fontFamily: "Arial, sans-serif" }}>
        <Container>
          <Section>
            <Heading as="h1">Подтвердите ваш email</Heading>
            <Text>
              Вы запросили подтверждение email. Нажмите на кнопку ниже, чтобы
              подтвердить email:
            </Text>
            <Button
              href={verificationUrl}
              style={{
                backgroundColor: "#000",
                color: "#fff",
                padding: "12px 20px",
                borderRadius: "3px",
                textDecoration: "none",
              }}
            >
              Подтвердить email
            </Button>
            <Hr style={{ margin: "20px 0" }} />
            <Text style={{ fontSize: "14px", color: "#666" }}>
              Эта ссылка действительна в течение 1 часа. Если вы не запрашивали
              подтверждение email, проигнорируйте это письмо.
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
}
