import {Divider} from "@chakra-ui/react";
import React from "react";
import {BiHome, BiInfoCircle, BiLogIn, BiPlus, BiUserPlus, BiWallet} from "react-icons/bi";
import {useSelector} from "react-redux";

import {useMyInstitutionsQuery, useMyProvidersQuery} from "../../api/generated";
import {useClientOnlyLoginState} from "../../hooks/useClientOnlyLoginState";
import {selectUserId} from "../../store/auth";
import {SidebarItem} from "./SidebarItem";
import {SidebarSectionTitle} from "./SidebarSectionTitle";

export interface SidebarContentProps {
	onClose: () => void;
}

export const SidebarContent: React.FC<SidebarContentProps> = ({onClose}) => {
	const userId = useSelector(selectUserId);
	const {data: myInstitutions} = useMyInstitutionsQuery({variables: {userId}, skip: !userId});
	const {data: myProviders} = useMyProvidersQuery({variables: {userId}, skip: !userId});
	const isUserLoggedIn = useClientOnlyLoginState();

	const providers = myProviders?.providers ?? [];
	const doProvidersExist = providers.length > 0;

	return (
		<>
			{isUserLoggedIn && (
				<>
					{doProvidersExist && <SidebarSectionTitle>Einrichtungen</SidebarSectionTitle>}

					{myInstitutions?.institutions?.map(({id, name}) => (
						<SidebarItem
							key={id}
							href={`/members/institution/${id}`}
							icon={BiHome}
							onClick={onClose}
						>
							{name}
						</SidebarItem>
					))}

					<SidebarItem href="/members/add-institution" icon={BiPlus} onClick={onClose}>
						Einrichtung hinzufügen
					</SidebarItem>

					{doProvidersExist && (
						<>
							<Divider my={4} />
							<SidebarSectionTitle>Träger</SidebarSectionTitle>
							{providers.map(({id, name}) => (
								<SidebarItem
									key={id}
									href={`/members/provider/${id}`}
									icon={BiWallet}
									onClick={onClose}
								>
									{name}
								</SidebarItem>
							))}
						</>
					)}
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
