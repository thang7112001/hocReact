import { useState } from "react";


export default function HomestayManager() {
    const [owners, setOwners] = useState([
        { id: 1, name: "Nguyen Van A" },
        { id: 2, name: "Tran Thi B" },
        { id: 3, name: "Le Van C" },
    ]);

    const [homestays, setHomestays] = useState([
        {
            name: 'Sunshine Villa',
            price: 1200000,
            address: '123 Đường Biển, Đà Nẵng',
            rooms: 3,
            ownerId: 1,
            rented: 0
        },
        {
            name: 'Peaceful House',
            price: 850000,
            address: '45 Nguyễn Trãi, Huế',
            rooms: 2,
            ownerId: 2,
            rented: 0
        },
        {
            name: 'Mountain Retreat',
            price: 1000000,
            address: '88 Phan Đình Phùng, Đà Lạt',
            rooms: 4,
            ownerId: 3,
            rented: 0
        }
    ]);
    const [searchTerm, setSearchTerm] = useState('');
    const [sortOrder, setSortOrder] = useState(null);
    const [newHomestay, setNewHomestay] = useState({
        name: '',
        price: '',
        address: '',
        rooms: '',
        ownerId: '',
        rented: 0
    });

    const [newOwner, setNewOwner] = useState({ name: '' });
    const [editingOwnerId, setEditingOwnerId] = useState(null);
    const [editingOwnerName, setEditingOwnerName] = useState('');

    function addHomestay() {
        setHomestays([...homestays, { ...newHomestay, price: Number(newHomestay.price), rooms: Number(newHomestay.rooms), rented: 0 }]);
        setNewHomestay({ name: '', price: '', address: '', rooms: '', ownerId: '', rented: 0 });
    }

    function rentHomestay(index) {
        const updated = [...homestays];
        updated[index].rented += 1;
        setHomestays(updated);
    }

    function filterAndSort(list) {
        let filtered = list.filter(item =>
            item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.price.toString().includes(searchTerm) ||
            item.rooms.toString().includes(searchTerm)
        );

        if (sortOrder === 'asc') {
            filtered.sort((a, b) => a.price - b.price);
        } else if (sortOrder === 'desc') {
            filtered.sort((a, b) => b.price - a.price);
        }
        return filtered;
    }

    function addOwner() {
        const newId = owners.length > 0 ? Math.max(...owners.map(o => o.id)) + 1 : 1;
        setOwners([...owners, { id: newId, name: newOwner.name }]);
        setNewOwner({ name: '' });
    }

    function deleteOwner(id) {
        setOwners(owners.filter(owner => owner.id !== id));
    }

    function startEditOwner(id, name) {
        setEditingOwnerId(id);
        setEditingOwnerName(name);
    }

    function saveEditOwner() {
        setOwners(owners.map(owner => owner.id === editingOwnerId ? { ...owner, name: editingOwnerName } : owner));
        setEditingOwnerId(null);
        setEditingOwnerName('');
    }

    return (
        <div className="container">
            <div className="homestay-list">
                <h2>Danh sách Homestay</h2>
                <input
                    type="text"
                    placeholder="Tìm kiếm theo tên, giá, địa chỉ, số phòng"
                    value={searchTerm}
                    onChange={e => setSearchTerm(e.target.value)}
                />
                <button onClick={() => setSortOrder('asc')}>Sắp xếp tăng</button>
                <button onClick={() => setSortOrder('desc')}>Sắp xếp giảm</button>
                <div className="list">
                    {filterAndSort(homestays).map((item, index) => (
                        <div key={index} className="homestay-item">
                            <h3>{item.name}</h3>
                            <p>Giá: {item.price}</p>
                            <p>Địa chỉ: {item.address}</p>
                            <p>Số phòng: {item.rooms}</p>
                            <p>Chủ phòng: {owners.find(o => o.id === item.ownerId)?.name || 'Không rõ'}</p>
                            <p>Lượt thuê: {item.rented}</p>
                            <button onClick={() => rentHomestay(index)}>Thuê</button>
                        </div>
                    ))}
                </div>
            </div>
            <hr />
            <div className="add-form">
                <h2>Thêm Homestay mới</h2>
                <input type="text" placeholder="Tên" value={newHomestay.name} onChange={e => setNewHomestay({ ...newHomestay, name: e.target.value })} />
                <input type="number" placeholder="Giá" value={newHomestay.price} onChange={e => setNewHomestay({ ...newHomestay, price: e.target.value })} />
                <input type="text" placeholder="Địa chỉ" value={newHomestay.address} onChange={e => setNewHomestay({ ...newHomestay, address: e.target.value })} />
                <input type="number" placeholder="Số phòng" value={newHomestay.rooms} onChange={e => setNewHomestay({ ...newHomestay, rooms: e.target.value })} />
                <select value={newHomestay.ownerId} onChange={e => setNewHomestay({ ...newHomestay, ownerId: e.target.value })}>
                    <option value="">---Chọn chủ phòng---</option>
                    {owners.map(owner => (
                        <option key={owner.id} value={owner.id}>{owner.name}</option>
                    ))}
                </select>
                <button onClick={addHomestay}>Thêm Homestay</button>
            </div>
            <hr />
            <div className="owner-management">
                <h2>Quản lý Chủ phòng</h2>
                <input type="text" placeholder="Tên chủ phòng" value={newOwner.name} onChange={e => setNewOwner({ name: e.target.value })} />
                <button onClick={addOwner}>Thêm chủ phòng</button>
                <ul>
                    {owners.map(owner => (
                        <li key={owner.id}>
                            {editingOwnerId === owner.id ? (
                                <>
                                    <input type="text" value={editingOwnerName} onChange={e => setEditingOwnerName(e.target.value)} />
                                    <button onClick={saveEditOwner}>Lưu</button>
                                </>
                            ) : (
                                <>
                                    {owner.name}
                                    <button onClick={() => startEditOwner(owner.id, owner.name)}>Sửa</button>
                                    <button onClick={() => deleteOwner(owner.id)}>Xóa</button>
                                </>
                            )}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}
