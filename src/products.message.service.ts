import { Inject, RequestTimeoutException } from "@nestjs/common";
import { ClientProxy } from "@nestjs/microservices";
import { catchError, throwError, timeout, TimeoutError } from "rxjs";

export class ProductsMessageService {
    constructor(
        @Inject('PRODUCTS_CLIENT')
        private readonly client: ClientProxy,
    ) { }

    async sendMessage(message, data) {
        let send = await this.client.send(message, data)
            .pipe(
                timeout(12000),
                catchError(err => {
                    if (err instanceof TimeoutError) {
                        return throwError(new RequestTimeoutException());
                    }
                    return throwError(err);
                })
            )
            .toPromise();

        return send
    }

}