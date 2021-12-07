import React from "react";
import { Container, Table } from "react-bootstrap";
import Header from './index';
import Footer from './footer';
import Moment from 'moment';


// async function getData() {
//     const response = await fetch("http://express-demo-account.herokuapp.com/users");
//     const data = await response.json();
//     // store the data into our books variable
//     return data;
// }
class List extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            book: [],
            isLoading: false
        }
    }
    componentDidMount() {
        this.setState({ isLoading: true })
        let api_url = 'http://express-demo-account.herokuapp.com/users';
        fetch(api_url)
            .then(res => {
                // Unfortunately, fetch doesn't send (404 error) into the cache itself
                // You have to send it, as I have done below
                if (res.status >= 400) {
                    throw new Error("Server responds with error!");
                }
                return res.json();
            })
            .then(book => {
                this.setState({
                    book: book.data,
                    isLoading: false
                })
            }, err => {
                this.setState({
                    err,
                    isLoading: false
                })
            });
    }
    render() {
        let { book, isLoading } = this.state;
        return (
            <>
                <Header />
                <Container style={{ marginTop: '50px' }}>
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>Sno</th>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                book.map((b, index) => (
                                    <tr key={b.id}>
                                        <td>{index + 1}</td>
                                        <td> {b.name}</td>
                                        <td>{b.email}</td>
                                        <td>{Moment(b.date).format("DD-MM-YYYY")}</td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </Table>
                </Container>
                <Footer />
            </>
        );
    }
}
export default List;