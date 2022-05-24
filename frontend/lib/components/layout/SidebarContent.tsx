import React from "react";
import {BiInfoCircle, BiLogIn, BiUserPlus} from "react-icons/bi";
import {BsHouseFill} from "react-icons/bs";
import {MdAddBox} from "react-icons/md";
import {useSelector} from "react-redux";

import {useMyInstitutionsQuery} from "../../api/generated";
import {useClientOnlyLoginState} from "../../hooks/useClientOnlyLoginState";
import {selectUserId} from "../../store/auth";
import {SidebarItem} from "./SidebarItem";

export interface SidebarContentProps {
	onClose: () => void;
}

export const SidebarContent: React.FC<SidebarContentProps> = ({onClose}) => {
	const userId = useSelector(selectUserId);
	const {data: myInstitutions} = useMyInstitutionsQuery({variables: {userId}, skip: !userId});
	const isUserLoggedIn = useClientOnlyLoginState();

	return (
		<>
			{isUserLoggedIn && (
				<>
					{myInstitutions?.institutions?.map((institution) => (
						<SidebarItem
							key={institution.name}
							href={`/members/institution/${institution.id}`}
							icon={BsHouseFill}
							onClick={onClose}
						>
							{institution.name}
						</SidebarItem>
					))}

					<SidebarItem href="/members/add-institution" icon={MdAddBox} onClick={onClose}>
						Einrichtung hinzufügen
					</SidebarItem>
				</>
			)}

			{!isUserLoggedIn && (
				<>
					<SidebarItem href="/about" icon={BiInfoCircle} onClick={onClose}>
						Über Uns
					</SidebarItem>
					{/* <Divider /> */}
					<SidebarItem href="/members/login" icon={BiLogIn} onClick={onClose}>
						Anmelden
					</SidebarItem>
					<SidebarItem href="/members/register" icon={BiUserPlus} onClick={onClose}>
						Registrieren
					</SidebarItem>
				</>
			)}
		</>
	);
};
