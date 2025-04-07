import React, { useEffect, useState } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";

const UserList = () => {
    const [listOfUser, setListOfUser] = useState([]); // État pour stocker les utilisateurs
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        // Récupérer les données via Axios
        axios
            .get("https://jsonplaceholder.typicode.com/users")
            .then((response) => {
                setListOfUser(response.data); // Mettre à jour l'état avec les données reçues
            })
            .catch((error) => {
                console.error(
                    "Erreur lors de la récupération des utilisateurs :",
                    error
                );
            });
    }, []); // Le tableau vide pour exécuter cet effet une seule fois

    const filteredUsers = listOfUser.filter((user) =>
        user.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div>
            <h1>Liste des utilisateurs</h1>
            <input
                type="text"
                placeholder="Rechercher un utilisateur"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />
            <ul>
                <AnimatePresence>
                    {filteredUsers.map((user) => (
                        <motion.li
                            key={user.id}
                            initial={{ opacity: 0, y: 10 }} // Animation au chargement
                            animate={{ opacity: 1, y: 0 }}  // Animation en cours
                            exit={{ opacity: 0, y: -10 }}   // Animation à la suppression
                            transition={{ duration: 0.5 }}  // Durée de l'animation
                        >
                            <h2>{user.name}</h2>
                            <p>Email: {user.email}</p>
                            <p>Phone: {user.phone}</p>
                            <p>
                                Address: {user.address.street}, {user.address.city}
                            </p>
                            <button onClick={() => alert(`Profil de ${user.name}`)}>
                                Voir le profil
                            </button>
                        </motion.li>
                    ))}
                </AnimatePresence>
            </ul>
            {filteredUsers.length === 0 && (
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    Aucun utilisateur trouvé ou une erreur s'est produite.
                </motion.p>
            )}
        </div>
    );
};

export default UserList;
