export const TableItem = ({ shelf }) => {
  return (
    <>
      {shelf.map((e) => {
        const { title, authName, pageNum, isRead, id } = e;
        return (
          <tbody key={id} className="l">
            <tr>
              <td>{id.slice(7)}</td>
              <td>{title}</td>
              <td>{authName}</td>
              <td>{pageNum}</td>
              <td>{isRead ? "read" : "unread"}</td>
            </tr>
          </tbody>
        );
      })}
    </>
  );
};
