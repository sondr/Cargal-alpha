export async function ready(doc: Document = document): Promise<Document | any> {
    return new Promise((resolve, reject) => {
        try {

            if (doc.readyState === 'loading') {
                let listener = (): void => {
                    doc.removeEventListener('DOMContentLoaded', listener);
                    resolve(doc);
                };

                doc.addEventListener('DOMContentLoaded', listener);
            } else {
                resolve(doc)
            }

        } catch (err) {
            reject(err);
        }
    });
}