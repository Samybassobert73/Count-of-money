export const CryptoTableHeader = ({ userIsHome }: { userIsHome: boolean }) => {
    return (<thead className="border-b bg-gray-100">
        <tr className={'grid items-center grid-cols-' + (userIsHome ? '6' : '7')}>
            <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                NO
            </th>
            <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                NAME
            </th>
            <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                LAST PRICE
            </th>
            <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                VOLUME
            </th>
            <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                CHANGE
            </th>
            <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                MARKET STATS
            </th>
            {!userIsHome ? <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                FAVORITE
            </th> : null}
        </tr>
    </thead>)
}
