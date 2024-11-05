import ShareableNote from "@/components/ShareableNote";
import { connect } from "@/lib/database";
import { findShare } from "@/service/share.service";
import { findSnippet } from "@/service/snippet.service";
import { redirect } from "next/navigation";
import { Toaster } from "react-hot-toast";

async function ShareableLink({ params }: { params: { shareId: string } }) {
  await connect();

  const shareInfo = await findShare(params.shareId);

  if (!shareInfo) {
    redirect("/");
  }

  const snippetInfo = await findSnippet(shareInfo.snippetId);

  if (!snippetInfo) {
    redirect("/");
  }

  return (
    <>
      <ShareableNote note={snippetInfo} />
      <Toaster
        toastOptions={{
          style: {
            backgroundColor: "white",
            color: "black",
          },
        }}
      />
    </>
  );
}

export default ShareableLink;
