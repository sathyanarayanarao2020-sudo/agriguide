function IrrigationCard({ title, water }) {
  return (
    <div className='card'>
      <h2>{title}</h2>
      <p>Water Usage : {water}</p>
    </div>
  )
}

export default IrrigationCard