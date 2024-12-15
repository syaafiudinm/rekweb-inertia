import { Link, router } from "@inertiajs/react";
import Swal from "sweetalert2";

export default function Layouts({ children, isAuthenticated }) {
    function showAlert() {
        Swal.fire({
            title: "Are you sure want to logout?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "logout!",
        }).then((result) => {
            if (result.isConfirmed) {
                router.post(route("logout")); // Assuming this is a method you use to delete the post
                Swal.fire("Logout!", "You has been logout.", "success").then(
                    () => {
                        window.location.href = "/";
                    }
                );
            }
        });
    }

    const handleLogout = (e) => {
        e.preventDefault();
        showAlert();
    };
    return (
        <>
            <header>
                <nav>
                    <Link className="nav-link" href="/">
                        Home
                    </Link>
                    <Link className="nav-link" href="posts/create">
                        Create
                    </Link>
                </nav>
            </header>
            <main>{children}</main>
        </>
    );
}
