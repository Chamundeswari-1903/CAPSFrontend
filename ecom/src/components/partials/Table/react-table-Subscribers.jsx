import React from "react";
import SubTutorTable from "./SubTutorTable";
import Card from "../../../components/ui/Card";

const SubscriberDetails = () => {
  return (
    <div>
      <Card className="mb-4" title="Recent orders :- " noborder>
        {" "}
        <SubTutorTable />
      </Card>
    </div>
  );
};

export default SubscriberDetails;
