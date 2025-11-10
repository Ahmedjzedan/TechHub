export default function ContactUs() {
  return (
    <div className="flex flex-wrap m-4 gap-4">
      <Item
        name="Phone numbers"
        children={
          <ul className="flex flex-col gap-2 mt-4">
            <span>Zain</span>
            <span>Asia Cell</span>
            <span>Korek</span>
          </ul>
        }
      />
      <Item
        name="Social Media"
        children={
          <ul className="flex flex-col gap-2 mt-4">
            <span>Telegram</span>
            <span>FaceBook</span>
            <span>Instgram</span>
            <span>Linkedin</span>
          </ul>
        }
      />
      <Item
        name="Addresses"
        children={
          <ul className="flex flex-col gap-2 mt-4">
            <span>Al hay</span>
            <span>Al hay</span>
            <span>Al hay</span>
            <span>Al hay</span>
          </ul>
        }
      />
    </div>
  );
}

function Item({ children, name }: { children: React.ReactNode; name: string }) {
  return (
    <div className="flex flex-col bg-background-shade-light rounded-2xl border-foreground border-2 p-4 flex-1">
      <div className="flex justify-center">{name}</div>
      {children}
    </div>
  );
}
