import { ActiveOnCondition } from "../../node_modules/toolbox-v2/src/toolbox/components/active-on-condition/base";
import { Scroll } from "../../node_modules/toolbox-v2/src/toolbox/utils/cached-vectors/scroll";

class Nav {
  private scrollWatcher_: ActiveOnCondition = null;
  constructor() {}
  startScrollWatcher(): void {
    this.scrollWatcher_ = new ActiveOnCondition(
      "nav",
      () => {
        return Scroll.getSingleton().getPosition().y > 30;
      },
      "minimal"
    );
  }
  destroy(): void {
    this.scrollWatcher_.destroy();
    this.scrollWatcher_ = null;
  }
}

export { Nav };
