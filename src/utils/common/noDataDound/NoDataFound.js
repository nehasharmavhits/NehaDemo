import React from "react";
import Index from "../../../component/user/Index";

const NoDataFound = ({ colSpan, message }) => {
  return (
    <Index.Table className="no-data-table">
      <Index.TableRow>
        <Index.TableCell className="no-data-label" colSpan={colSpan}>
          {message || "No record found"}
        </Index.TableCell>
      </Index.TableRow>
    </Index.Table>
  );
};

export default NoDataFound;
