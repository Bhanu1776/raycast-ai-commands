import { Detail } from "@raycast/api";
import { useCachedPromise } from "@raycast/utils";
import { RunView } from "./components/RunView";
import { getCommand } from "./lib/store";

export default function Command() {
  const { data, isLoading } = useCachedPromise(getCommand, ["clean-text"]);
  if (isLoading || !data) return <Detail isLoading={isLoading} markdown="" />;
  return <RunView command={data} />;
}
