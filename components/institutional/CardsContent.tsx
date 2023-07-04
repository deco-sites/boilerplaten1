import type { AvailableIcons, SocialIcons, PaymentIcons } from "$store/components/ui/Icon.tsx";

type Icon = AvailableIcons | SocialIcons | PaymentIcons;

export interface Props {
    cards: {
        heading: {
            title: string;
            icon?: Icon;
        },
        content: {
            subtitle?: string;
            text?: string;
        },
        links: {
            label: string;
            url: string;
            icon?: Icon;
        }[];
    }[];
}

function CardsContent({ cards }: Props) {
    return (
        <div></div>
    );
}

export default CardsContent;