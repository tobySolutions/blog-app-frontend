import {
  NovuProvider,
  PopoverNotificationCenter,
  NotificationBell,
} from "@novu/notification-center";

import { useNavigate } from "react-router-dom";

function Notify() {
  const navigate = useNavigate();

  const onNotificationClick = (notification) => {
    navigate(notification.cta.data.url);
  };

  return (
    <div>
      <NovuProvider
        subscriberId="642f1ab4c6b53aa5dda90e5b"
        applicationIdentifier="S-7-_beqETr9"
      >
        <PopoverNotificationCenter
          onNotificationClick={onNotificationClick}
          colorScheme="light"
        >
          {({ unseenCount }) => <NotificationBell unseenCount={unseenCount} />}
        </PopoverNotificationCenter>
      </NovuProvider>
    </div>
  );
}

export default Notify;
