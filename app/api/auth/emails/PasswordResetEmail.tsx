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

export default function PasswordResetEmail({
  resetUrl,
}: {
  resetUrl: string;
}): JSX.Element {
  return (
    <Html>
      <Head />
      <Body style={{ fontFamily: "Arial, sans-serif" }}>
        <Container>
          <Section>
            <Heading as="h1">Сброс пароля</Heading>
            <Text>
              Вы запросили сброс пароля. Нажмите на кнопку ниже, чтобы
              установить новый пароль:
            </Text>
            <Button
              href={resetUrl}
              style={{
                backgroundColor: "#000",
                color: "#fff",
                padding: "12px 20px",
                borderRadius: "3px",
                textDecoration: "none",
              }}
            >
              Сбросить пароль
            </Button>
            <Hr style={{ margin: "20px 0" }} />
            <Text style={{ fontSize: "14px", color: "#666" }}>
              Эта ссылка действительна в течение 1 часа. Если вы не запрашивали
              сброс пароля, проигнорируйте это письмо.
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
}
