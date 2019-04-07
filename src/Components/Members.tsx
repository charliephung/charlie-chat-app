import React, { useEffect } from "react";
import useCollecton from "../Hooks/useCollecton";
import { TMember } from "../types";

type props = {
  channelId: string;
};

const Members: React.FunctionComponent<props> = ({ channelId }) => {
  const mems = useCollecton<TMember>("users", undefined, [
    `channels.${channelId}`,
    "==",
    true
  ]);

  return (
    <div className="Members">
      <div>
        {mems.sort(sortByName).map(mem => (
          <div key={mem.id} className="Member">
            <div className="MemberStatus online" />
            {mem.displayName}
          </div>
        ))}
      </div>
    </div>
  );
};

function sortByName(a: TMember, b: TMember) {
  if (a.displayName > b.displayName) return 1;
  if (a.displayName < b.displayName) return -1;
  return 0;
}

export default Members;
