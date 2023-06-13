import React, { useId, useState } from "react";
import "../styles/Create.css";
import Table from "react-bootstrap/Table";
const Create = () => {
  const [values, setValues] = useState({
    product: "",
    category: "",
    price: "",
    qauntity: "",
  });
  const [allvalue, setAllValue] = useState([]);
  const [count, setCount] = useState(0);
  const [type, setType] = useState();

  const { product, category, price, qauntity } = values;

  const handleChange = (e) => {
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    });
  };
  const handleSearch = (e) => {
    const searchting = e.target.value;
    if (searchting == "" || searchting == null) {
      setAllValue([...allvalue]);
    } else {
      const filtred = allvalue.filter((val) =>
        val.product.includes(searchting)
      );
      setAllValue(filtred);
    }
  };
  const handleClick = () => {
    if (type === "update") {
      const del = allvalue.filter(
        (val) => val.id !== parseInt(localStorage.getItem("id"))
      );

      setAllValue([
        ...del,
        { ...values, id: parseInt(localStorage.getItem("id")) },
      ]);
      setValues({
        product: "",
        category: "",
        price: "",
        qauntity: "",
      });
    } else {
      setCount(count + 1);
      setAllValue([...allvalue, { ...values, id: count }]);
      setValues({
        product: "",
        category: "",
        price: "",
        qauntity: "",
      });
    }
  };

  const handleRead = (ele, type) => {
    localStorage.setItem("id", ele.id);
    setType(type);
    if (type === "read") {
      setValues(ele);
    } else if (type === "delete") {
      const del = allvalue.filter((val) => val.id !== ele.id);
      setAllValue(del);
    } else if (type === "update") {
      const del = allvalue.filter((val) => val.id === ele.id);
      setValues(...del);
    }
  };

  const onfilcategory = (e) => {
    const fill = allvalue.filter((ele) => ele.category === e.target.value);
    setAllValue(fill);
  };
  return (
    <div>
      <input
        type="text"
        placeholder="Enter Product"
        name="product"
        value={product}
        onChange={handleChange}
        className="mb-2"
        readOnly={type == "read"}
      />{" "}
      <br></br>
      <select
        value={values.category}
        name="category"
        onChange={handleChange}
        disabled={type == "read"}
      >
        <option value="groceries">groceries</option>
        <option value="electronics">electronics</option>
        <option value="footwear">footwear</option>
      </select>{" "}
      <br></br>
      <br></br>
      <input
        type="number"
        placeholder="Enter Price"
        name="price"
        readOnly={type == "read"}
        value={price}
        onChange={handleChange}
        className="mb-2"
      />{" "}
      <br></br>
      <input
        type="number"
        placeholder="Enter quntity"
        name="qauntity"
        readOnly={type == "read"}
        value={qauntity}
        onChange={handleChange}
        className="mb-2"
      />{" "}
      <br></br>
      <button onClick={() => handleClick()} className="btn btn-primary">
        Submit
      </button>
      <div>
        <br></br>
        <div className="bothdata">
            Search:
          <input
            type="text"
            name="search"
            onChange={handleSearch}
            placeholder="search data"
          />
          Filter :
          <select
            placeholder="filter by category"
            name="category"
            onChange={onfilcategory}
            className="mx-2"
          >
            <option value="groceries">groceries</option>
            <option value="electronics">electronics</option>
            <option value="footwear">footwear</option>
          </select>
        </div>
        <br></br>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Product</th>
              <th>category</th>
              <th>Price</th>
              <th>quntity</th>
              <th>action</th>
            </tr>
          </thead>

          {allvalue &&
            allvalue?.map((ele, index) => {
              return (
                <tbody>
                  <tr>
                    <td>{ele.product}</td>
                    <td>{ele.category}</td>
                    <td>{ele.price}</td>
                    <td>{ele.qauntity}</td>
                    <tr>
                      <button
                        className="btn btn-primary mx-2"
                        onClick={() => handleRead(ele, "read")}
                      >
                        Read
                      </button>
                      <button
                        className="btn btn-danger mx-2"
                        onClick={() => handleRead(ele, "delete")}
                      >
                        delete
                      </button>
                      <button
                        className="btn btn-warning"
                        onClick={() => handleRead(ele, "update")}
                      >
                        update
                      </button>
                    </tr>
                  </tr>
                </tbody>
              );
            })}
        </Table>
      </div>
    </div>
  );
};

export default Create;
