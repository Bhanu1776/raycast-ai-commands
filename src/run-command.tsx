import { Detail, type LaunchProps } from "@raycast/api";
import { useCachedPromise } from "@raycast/utils";
import { RunView } from "./components/RunView";
import { getCommand } from "./lib/store";

/**
 * Target for quicklinks and deeplinks, so any command can get a hotkey:
 * raycast://extensions/<author>/<extension>/run-command?context={"id":"..."}
 */
export default function Command(props: LaunchProps<{ launchContext?: { id?: string } }>) {
  const id = props.launchContext?.id;
  const { data, isLoading } = useCachedPromise(async (cid?: string) => (cid ? getCommand(cid) : undefined), [id]);

  if (isLoading) return <Detail isLoading markdown="" />;
  if (!id || !data) {
    return (
      <Detail
        markdown={`## Command not found\n\nThis command needs an \`id\` in its launch context. Open **Search AI Commands**, pick a command, and use **Create Quicklink for Hotkey** to get a working link.`}
      />
    );
  }
  return <RunView command={data} />;
}
