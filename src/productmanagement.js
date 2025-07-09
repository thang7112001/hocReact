import { useState } from "react";

export default function ListProduct() {
    let [products, setProducts] = useState([
            {name: 'iphone 1', price: 100, quantity: 10, category: 'phone'},
            {name: 'iphone 2', price: 200, quantity: 15, category: 'phone'},
            {name: 'iphone 3', price: 205, quantity: 16, category: 'phone'},
            {name: 'mac pro', price: 2050, quantity: 11, category: 'laptop'},
            {name: 'mac mini', price: 2005, quantity: 12, category: 'laptop'},
            {name: 'mac air', price: 2055, quantity: 13, category: 'laptop'},
        ]
    );
    let [categoryList, setCategoryList] = useState(['phone', 'laptop']);
    let [addCate,setAddCate] = useState('');
    let [item, setItem] = useState('');
    let [itemPrice, setItemPrice] = useState('');
    let [itemQuantity, setItemQuantity] = useState('');
    let [search, setSearch] = useState('');
    let [editIndex, setEditIndex] = useState(null);
    let [sortOrder, setSortOrder] = useState('none');

    function addProducts() {
        const newProduct = {
            name: item,
            price: Number(itemPrice),
            quantity: Number(itemQuantity),
            category:
        };

        if (editIndex !== null) {
            const updated = [...products];
            updated[editIndex] = newProduct;
            setProducts(updated);
            setEditIndex(null);
        } else {
            setProducts([...products, newProduct]);
        }

        setItem('');
        setItemPrice('');
        setItemQuantity('');
        setAddCate('');
    }

    function deleteProduct(index) {
        const updated = products.filter((_, i) => i !== index);
        setProducts(updated);
    }

    function editProduct(index) {
        const p = products[index];
        setItem(p.name);
        setItemPrice(p.price);
        setItemQuantity(p.quantity);
        setEditIndex(index);
    }

    function findProducts() {
        return products.filter(product =>
            product.name.toLowerCase().includes(search.toLowerCase())
        );
    }

    function sortProductsAsc() {
        if (sortOrder === 'asc'){
            setProducts([...products]);
            setSortOrder('none');
        }else {
            const sorted = [...products].sort((a, b) => a.price - b.price);
            setProducts(sorted);
            setSortOrder('asc');
        }
    }
    function sortProductsDesc() {
        if (sortOrder === 'desc'){
            setProducts([...products]);
            setSortOrder('none');
        }else {
            const sorted = [...products].sort((a, b) => b.price - a.price);
            setProducts(sorted);
            setSortOrder('desc');
        }
    }
    function addCategory() {
        const newCate = [addCate];
        setCategoryList([...categoryList,newCate]);
        setAddCate('');
    }

    return (
        <div style={{ padding: '20px' }}>
            <input
                type="text"
                placeholder="Them category"
                value={addCate}
                onChange={(e) => setAddCate(e.target.value)}
            />
            <button onClick={addCategory}>add</button>
            {
                categoryList.map((y, index) => (
                    <h5>
                        {index + 1}.  {y}
                    </h5>
                ))
            }
            <hr/>
            <h2>Danh sách sản phẩm</h2>

            <input
                type="text"
                placeholder="Tìm sản phẩm"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
            />
            <button onClick={sortProductsAsc} >
                Sắp xếp theo giá tăng
            </button>
            <button onClick={sortProductsDesc} >
                Sắp xếp theo giá giảm
            </button>

            <div style={{ marginTop: '10px' }}>
                {findProducts().map((product, index) => (
                    <div key={index}>
                        <h4>
                            {product.name}: {product.price}₫ - SL: {product.quantity} - {product.category}
                            <button onClick={() => editProduct(index)} >Sửa</button>
                            <button onClick={() => deleteProduct(index)}>Xóa</button>
                        </h4>
                    </div>
                ))}
            </div>

            <div style={{ marginTop: '20px' }}>
                <input
                    type="text"
                    value={item}
                    placeholder="Tên sản phẩm"
                    onChange={(e) => setItem(e.target.value)}
                />
                <input
                    type="number"
                    value={itemPrice}
                    placeholder="Giá"
                    onChange={(e) => setItemPrice(e.target.value)}
                />
                <input
                    type="number"
                    value={itemQuantity}
                    placeholder="Tồn kho"
                    onChange={(e) => setItemQuantity(e.target.value)}
                />
                <select value={products.category}
                        onChange={(e)=>{setProducts({...products,category: e.target.value})}}
                >
                    {
                        categoryList.map((y, index) => (
                            <option value={y} key={index}>
                                {y}
                            </option>
                        ))
                    }
                </select>

                <button onClick={addProducts}>
                    {editIndex !== null ? 'Cập nhật' : 'Thêm'}
                </button>
            </div>
        </div>
    );
}
