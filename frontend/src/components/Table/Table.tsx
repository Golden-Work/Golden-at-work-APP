import classes from "./Table.module.css"
import classNames from "classnames"

export interface ElementProps {
  id?: number | undefined;
  name?: string | undefined;
  status?: "free" | "not-available" | "reserved" | undefined;
  image?: string | undefined;
  description?: string | undefined;
}
function TableElement({ id, name, status, description }: ElementProps) {
  const statusClass = classNames({
    [classes.status]: true,
    [classes.free]: status === "free",
    [classes.notAvailable]: status === "not-available",
    [classes.reserved]: status === "reserved",
  })

  return (
    <tr>
      <td>{id}</td>
      <td>{name}</td>
      <td>
        <p className={statusClass}>{status}</p>
      </td>
      <td>{description}</td>
    </tr>
  )
}

function Table({ data }: { data: ElementProps[] }) {
  const elements = data.map((e, i) => <TableElement key={i} {...e} />)
  return (
    <div className={classes.table}>
      <table>
        <thead>
          <tr>
            <th>Id</th>
            <th>Elemento</th>
            <th>status</th>
            <th>Descripcion</th>
          </tr>
        </thead>
        <tbody>{elements}</tbody>
      </table>
    </div>
  )
}

export default Table
