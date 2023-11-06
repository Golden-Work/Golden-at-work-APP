import classes from "./Table.module.css"

export interface ElementPropsReservation {
  return_state_description: string
  name: string
  start_date: string 
  return_label: string
}

function TableElement({ return_state_description, name, start_date, return_label }: ElementPropsReservation) {
   return (
    <tr>
      <td>{return_state_description}  </td>
      <td>{name}             </td>
      <td>{start_date}      </td>
      <td>{return_label}    </td>
    </tr>
  )
}

function TableReserved({ data }: { data: ElementPropsReservation[] }) {
  const elements = data.map((e, i) => <TableElement key={i} {...e} />)
  return (
    <div className={classes.table}>
      <table>
        <thead>
          <tr>
            <th>Descripción</th>
            <th>Elemento</th>
            <th>Fecha inicio</th>
            <th>Estado</th>
          </tr>
        </thead>
        <tbody>{elements}</tbody>
      </table>
    </div>
  )
}

export default TableReserved
