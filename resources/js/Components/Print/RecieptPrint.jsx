import React, { useRef } from "react";
import PropTypes from "prop-types";
import ReactToPrint from "react-to-print";
import { Button } from "reactstrap";

const RecieptPrint = (props) => {
    let componentRef = useRef();
    return (
        <>
            <div>
                <ReactToPrint
                    trigger={() => <Button>Print</Button>}
                    content={() => componentRef}
                />

                <div style={{ display: "none" }}>
                    <ComponentToPrint ref={(el) => (componentRef = el)} />
                </div>
            </div>
        </>
    );
};

RecieptPrint.propTypes = {};

export default RecieptPrint;

class ComponentToPrint extends React.Component {
    render() {
        return (
            <div
                style={{ width: "155px", maxWidth: "155px", fontSize: "11pt", font:'Times New Roman', background:'#fff' }}
            >
                <h2>Attendance</h2>
                <table className="font-weight-bold">
                    <thead>
                        <th>S/N</th>
                        <th>Name</th>
                        <th>Email</th>
                    </thead>
                    <tbody>
                        <tr>
                            <td>1</td>
                            <td>Njoku Samson</td>
                            <td>samson@yahoo.com</td>
                        </tr>
                        <tr>
                            <td>2</td>
                            <td>Ebere Plenty</td>
                            <td>ebere@gmail.com</td>
                        </tr>
                        <tr>
                            <td>3</td>
                            <td>Undefined</td>
                            <td>No Email</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        );
    }
}
