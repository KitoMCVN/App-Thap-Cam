import React from "react";
import { useLanguage } from "../../../../../../../hooks";
import { Button } from "../../../../../../../components/Button";
import { faArrowRightToBracket } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const NoLogin = () => {
  const { t } = useLanguage();

  return (
    <div>
      <Button>
        <div className="flex items-center gap-2">
          <FontAwesomeIcon icon={faArrowRightToBracket} />
          <div>{t("login")}</div>
        </div>
      </Button>
    </div>
  );
};

export default NoLogin;
