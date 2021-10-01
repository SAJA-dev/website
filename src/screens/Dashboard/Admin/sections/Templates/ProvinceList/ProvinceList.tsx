import { useEffect, useState } from 'react';
import { Button, Row, Col, ListGroup, Spinner } from 'react-bootstrap';
import { Province } from '../../../../../../global/types/Estate';
import { fetchGet } from '../../../../../../services/api/fetch';
import './ProvinceList.css';

function ProvinceList() {
  const [provinces, setProvinces] = useState<Province[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  async function getData(url: string) {
    fetchGet(url)
      .then((data) => {
        setProvinces(data.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  useEffect(() => {
    getData('http://localhost:8000/provinces');
  }, []);

  return (
    <>
      <h4 className="mt-4 ms-3 d-inline">استان ها</h4>
      <Button
        variant="dark"
        className="refresh-btn d-inline rounded-circle"
        onClick={() => {
          setLoading(true);
          getData('http://localhost:8000/provinces');
        }}
      >
        <i className="refresh-icon bi-arrow-counterclockwise"></i>
      </Button>
      {loading ? (
        <Row className="align-items-center">
          <Col>
            <Spinner animation="border" variant="primary" className="my-5" />
          </Col>
        </Row>
      ) : (
        <div className="d-flex flex-column justify-content-center align-items-center">
          <ListGroup className="mt-3" style={{ minWidth: 300, maxWidth: 400 }}>
            {provinces.map((province, index) => {
              return (
                <ListGroup.Item key={index}>{province.value}</ListGroup.Item>
              );
            })}
          </ListGroup>
        </div>
      )}
    </>
  );
}

export default ProvinceList;
