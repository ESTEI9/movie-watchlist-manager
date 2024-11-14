import { of } from "rxjs"

export class MockDialogRef {
    open = () => {
        return {
            afterClosed: () => of()
        }
    }
    close = () => {}
    backdropClick = () => of();
}