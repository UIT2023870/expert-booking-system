import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API from "../services/api";

function Experts() {

    const [experts, setExperts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [search, setSearch] = useState("");
    const [category, setCategory] = useState("");
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    // Fetch experts
    const fetchExperts = async () => {
        try {
            setLoading(true);
            const res = await API.get(
                `/experts?page=${page}&search=${search}&category=${category}`
            );
            setExperts(res.data.experts);
            setTotalPages(res.data.totalPages);
            setError("");
        } catch (error) {
            setError("Failed to fetch experts");
        } finally {
            setLoading(false);
        }
    };

    // Run when search/category/page changes
    useEffect(() => {
        fetchExperts();
    }, [search, category, page]);

    return (
        <div className="page">

            <h1>Find an Expert</h1>
            <p style={{ marginBottom: "24px" }}>Browse and book sessions with top professionals</p>

            {/* Search */}
            <div className="search-row">
                <input
                    type="text"
                    placeholder="Search by name..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />

                {/* Category Filter */}
                <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                >
                    <option value="">All Categories</option>
                    <option value="Career Guidance">Career Guidance</option>
                    <option value="Fitness">Fitness</option>
                    <option value="Mental Health">Mental Health</option>
                </select>
            </div>

            {/* Loading */}
            {loading && <p>Loading...</p>}

            {/* Error */}
            {error && <p className="alert alert-error">{error}</p>}

            {/* Experts List */}
            <div className="grid">
                {experts.map((expert) => (
                    <div key={expert._id} className="card">
                        <span className="badge">{expert.category}</span>
                        <h3>{expert.name}</h3>
                        <p>{expert.experience} yrs experience &nbsp;·&nbsp; ⭐ {expert.rating}</p>
                        <div style={{ marginTop: "14px" }}>
                            <Link to={`/experts/${expert._id}`}>
                                <button className="btn btn-primary" style={{ width: "100%" }}>
                                    View Profile
                                </button>
                            </Link>
                        </div>
                    </div>
                ))}
            </div>

            {/* Pagination */}
            <div className="pagination">
                <button
                    className="btn btn-outline"
                    disabled={page === 1}
                    onClick={() => setPage(page - 1)}
                >
                    ← Prev
                </button>
                <span>Page {page} of {totalPages}</span>
                <button
                    className="btn btn-outline"
                    disabled={page === totalPages}
                    onClick={() => setPage(page + 1)}
                >
                    Next →
                </button>
            </div>

        </div>
    );
}

export default Experts;
