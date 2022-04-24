import React from 'react';
import { ListGroup, Spinner } from 'react-bootstrap';

const TopList = ({ data, loading }) => {

  const style = {
    maxHeight: '15rem',
    overflow: 'auto',
    width: '47%',
    textAlign: 'center',
    paddingBottom: '1rem',
  };

  return (
    <>
      <h3>Top Passwords</h3>
      <p>Longer times are better</p>
      <ListGroup style={style}>
        {loading || !data ? (
          <Spinner style={{ alignSelf: 'center' }} animation="border" />
        ) : (
          data.map((score, index) => {
            return (
              <ListGroup.Item>
                <div className="font-weight-bold d-inline">{index + 1}.</div>
                <div className="font-italic d-inline"> {score.word}:</div>
                {` ${score.time} milliseconds`}
              </ListGroup.Item>
            );
          })
        )}
      </ListGroup>
    </>
  );
};

export default TopList;
