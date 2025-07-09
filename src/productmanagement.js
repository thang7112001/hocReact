import { useState } from "react";

export default function ListProduct() {
    let [products, setProducts] = useState([
        { name: 'iphone', price: 100, quantity: 10 },
        { name: 'iphone1', price: 200, quantity: 15 },
        { name: 'iphone2', price: 150, quantity: 20 }
    ]);
    let [item, setItem] = useState('');
    let [itemPrice, setItemPrice] = useState('');
    let [itemQuantity, setItemQuantity] = useState('');
    let [search, setSearch] = useState('');
    let [editIndex, setEditIndex] = useState(null);
    let [sortOrder, setSortOrder] = useState('asc');

    function addProducts() {
        const newProduct = {
            name: item,
            price: Number(itemPrice),
            quantity: Number(itemQuantity)
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

    function sortProducts() {
        const sorted = [...products].sort((a, b) =>
            sortOrder === 'asc' ? a.price - b.price : b.price - a.price
        );
        setProducts(sorted);
        setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    }

    return (
        <div style={{ padding: '20px' }}>
            <h2>Danh sách sản phẩm</h2>

            <input
                type="text"
                placeholder="Tìm sản phẩm"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
            />
            <button onClick={sortProducts}>
                Sắp xếp theo giá ({sortOrder === 'asc' ? 'Tăng' : 'Giảm'})
            </button>

            <div style={{ marginTop: '10px' }}>
                {findProducts().map((product, index) => (
                    <div key={index}>
                        <h4>
                            {product.name}: {product.price}₫ - SL: {product.quantity}
                            <button onClick={() => editProduct(index)}>Sửa</button>
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
                <button onClick={addProducts}>
                    {editIndex !== null ? 'Cập nhật' : 'Thêm'}
                </button>
            </div>
        </div>
    );
}
