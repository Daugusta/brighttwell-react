import React from 'react';

const Statistic = () => {
  return (
    <div className="grafana-panel">
        <h1>AQUIIII</h1>
      <iframe
        //src="http://192.168.23.11:3000/d/TgFmMSigk/demo-ds?orgId=1"
        src="http://192.168.23.11:3000/dashboard/snapshot/Y5IjfvWejrJnGikYsfG07qfX1cgJ1AqD"
        //src="http://192.168.23.11:3000/d/TgFmMSigk/demo-ds?orgId=1&from=1694587167697&to=1694599730724"
        width="100%"
        height="1000px" // ajusta el tamaño según sea necesario
        frameBorder="0"
        scrolling="no"
      ></iframe>
    </div>
  );
};

export default Statistic;
