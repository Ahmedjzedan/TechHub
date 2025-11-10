import AuthForm from "@/components/pages/authForm";
import ModalWrapper from "@/components/ui/wrappers/modalWrapper";

export default function SignInModal() {
  return (
    <ModalWrapper>
      <AuthForm mode="signin" />
    </ModalWrapper>
  );
}
