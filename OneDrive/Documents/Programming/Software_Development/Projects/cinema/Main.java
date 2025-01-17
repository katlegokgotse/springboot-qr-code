import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        // Write your code here
        Scanner scanner = new Scanner(System.in);
        System.out.println("Enter the number of rows:");
        int rows = scanner.nextInt();
        System.out.println("Enter the number of seats in each row:");
        int seats = scanner.nextInt();
        String[][] grid = new String[seats][rows];
        System.out.println("Cinema:");
        System.out.print("  ");
        for (int j = 1; j <= seats; j++) {
            System.out.print(j + " ");
        }
        System.out.println();
        for (int i = 0; i <= rows; i++) {
            System.out.printf("%d ", i);
            for (int j = 0; j <= seats; j++) {
                grid[i][j] = "S";
            }
            System.out.println();
        }
        System.out.println("Enter a row number");
        int rowChoice = scanner.nextInt();
        System.out.println("Enter a seat number in that row:");
        int seatNumber = scanner.nextInt();
        double total = 0;

        System.out.println("Total income:");
        System.out.println("$" + calculateIncome(seats, rows));

        drawUpGrid(grid);
    }

    public static void drawUpGrid(String[][] grid) {
        System.out.println("Cinema:");
        System.out.print("  ");
        for (int j = 1; j <= grid[0].length; j++) {
            System.out.print(j + " ");
        }
        System.out.println();

        for (int i = 0; i < grid.length; i++) {
            System.out.print((i + 1) + " ");
            for (int j = 0; j < grid[i].length; j++) {
                System.out.print(grid[i][j] + " ");
            }
            System.out.println();
        }
    }

    public static double calculateIncome(int rows, int seats) {
        double total = 0;
        if (rows * seats <= 60) {
            total = (seats * rows) * 10;
        } else {
            double frontHalf = (rows) / 2;
            double remainder = (rows + 1) / 2;
            total = (remainder * seats * 8) + (frontHalf * seats * 10);
        }
        return total;
    }
}