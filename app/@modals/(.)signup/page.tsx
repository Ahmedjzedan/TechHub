import AuthForm from "@/components/pages/authForm";
import ModalWrapper from "@/components/ui/wrappers/modalWrapper";

export default function SignUpModal() {
  return (
    <ModalWrapper>
      <AuthForm mode="signup" />
    </ModalWrapper>
  );
}
