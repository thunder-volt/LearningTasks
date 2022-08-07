import MyContext from "./context";

import { AuthChecker } from "type-graphql";

const authChecker: AuthChecker<MyContext> = async ({ context: { user } }) => {
  if (!user) return false;
  return true;
};

export default authChecker;
