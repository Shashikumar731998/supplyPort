import React, { useEffect, useState } from "react";
import { AxiosInstance } from "../../../config/Axios";

function CreditsGrid() {
  const [ItemData, setItemData] = useState([]);
  const [OverDueDays, setOverDueDays] = useState([]);
  const [OutStandAmt, setOutStandAmt] = useState([]);

  console.log("shashi------ ItemData", ItemData);
  console.log("shashi------OverDueDays", OverDueDays);
  console.log("shashi------OutStandAmt", OutStandAmt);
  useEffect(() => {
    const fetchCategories = async () => {
      const params = new URLSearchParams({
        ProfileId: "00000093_Live",
        PartyId: "1661",
      });
      const Axios = new AxiosInstance({ setAuthHeader: true });
      try {
        const { data } = await Axios.fetch(
          "https://staging.ireckoner.com:4005/dashboard/getOverDueAmount?" +
            params.toString()
        );
        console.log(data);
        setItemData(data[0]?.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
      try {
        const { data } = await Axios.fetch(
          "https://staging.ireckoner.com:4005/dashboard/getOverdueDays?" +
            params.toString()
        );
        console.log(data);
        setOverDueDays(data[0]?.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }

      try {
        const { data } = await Axios.fetch(
          "https://staging.ireckoner.com:4005/dashboard/getTotalOutstanding?" +
            params.toString()
        );
        console.log(data);
        setOutStandAmt(data[0]?.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchCategories();
  }, []);
  return (
    <>
      <section>
        <div className="container slider-container">
          <div className="row">
            <div className="col-md-12">
              <div className="comman-hadding">
                <h2>Credits</h2>
              </div>
              {/* <div className="Total-Outstanding ">
                            <h5>Total Outstanding </h5>
                            <h2><i className="fal fa-rupee-sign"></i> 9,000</h2>
                            <div className="creditwrap">
                                <div className="credit-box">
                                    <h6><i className="fal fa-rupee-sign"></i> 2,59,850</h6>
                                    <p>Overdue Amount</p>
                                </div>
                                <div className="credit-box">
                                    <p>Overdue <span>69 Days</span></p>
                                </div>
                            </div>
                        </div> */}
              <div className="Total-Outstanding ">
                {OutStandAmt ? (
                  OutStandAmt.map((item, index) => (
                    <>
                      <h5>Total Outstanding </h5>
                      <h2>
                        <i className="fal fa-rupee-sign"></i>{" "}
                        {item["sum(Closing)"]}
                      </h2>
                    </>
                  ))
                ) : (
                  <>
                    <h5>Total Outstanding </h5>
                    <h2>
                      <i className="fal fa-rupee-sign"></i> 0
                    </h2>
                  </>
                )}
                <div className="creditwrap">
                  {ItemData &&
                    ItemData.map((item, index) => (
                      <div key={index} className="credit-box">
                        <h6>
                          <i className="fal fa-rupee-sign"></i> {item.DueAmount}
                        </h6>
                        <p>Overdue Amount</p>
                      </div>
                    ))}
                  {OverDueDays &&
                    OverDueDays?.map((item, index) => (
                      <div key={index} className="credit-box">
                        <p>
                          Overdue <span>{item.OverdueDays} Days</span>
                        </p>
                      </div>
                    ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default CreditsGrid;
