export class PushData {
    private title: String;
    private requestedTask: number;

    public getRequestedTask(): number {
        return this.requestedTask;
    }

    public setRequestedTask(requestedTask: number) {
        this.requestedTask = requestedTask;
    }
    public getTitle(): String {
        return this.title;
    }

    public setTitle(title: String) {
        this.title = title;
    }


}